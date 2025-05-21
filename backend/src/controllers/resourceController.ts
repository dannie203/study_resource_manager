import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { PrismaClient, ResourceStatus } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/resources
export const getResources = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;
  const isAdmin = (req as any).user?.role === 'ADMIN';
  try {
    let resources;
    if (isAdmin) {
      // Admin xem tất cả tài nguyên
      resources = await prisma.resource.findMany({
        include: { user: { select: { id: true, username: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // User chỉ xem tài nguyên đã được duyệt hoặc tài nguyên của chính mình
      resources = await prisma.resource.findMany({
        where: {
          OR: [
            { status: ResourceStatus.APPROVED },
            { createdBy: userId },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    }
    res.status(200).json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ error: 'Lỗi khi lấy danh sách resource' });
  }
};

// POST /api/resources
export const createResource = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;
  const { title, subject, fileUrl, originalName } = req.body;

  try {
    const newResource = await prisma.resource.create({
      data: {
        title,
        subject,
        fileUrl,
        originalName,
        createdBy: userId,
        status: 'PENDING', // Khi user upload, luôn ở trạng thái chờ duyệt
      },
    });

    res.status(201).json(newResource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while creating the resource. Please try again later.',
    });
  }
};

// GET /api/resources/download/:filename
export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../../uploads', filename);

  try {
    const resource = await prisma.resource.findFirst({
      where: { fileUrl: `/uploads/${filename}` },
      select: { originalName: true },
    });

    if (!resource) {
      res.status(404).json({ error: 'Không tìm thấy tài nguyên.' });
      return;
    }

    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Tệp không tồn tại trên server.' });
      return;
    }

    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(resource.originalName)}`
    );
    res.download(filePath);
    return;
  } catch (error) {
    console.error('Lỗi khi tải file:', error);
    res.status(500).json({ error: 'Lỗi khi tải file.' });
  }
};

// Tổng quan: tổng số tài nguyên, upload, download
export const getResourceStats = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const role = (req as any).user?.role;
  let totalApprovedResources = 0, userApprovedResources = 0, adminApprovedResources = 0;
  let totalUploads = 0, totalDownloads = 0;

  if (role === 'ADMIN') {
    // Tổng số tài nguyên đã duyệt toàn hệ thống
    totalApprovedResources = await prisma.resource.count({ where: { status: 'APPROVED' } });
    // Số tài nguyên đã duyệt của user hiện tại
    userApprovedResources = await prisma.resource.count({ where: { createdBy: userId, status: 'APPROVED' } });
    // Số tài nguyên đã duyệt của admin (nếu cần tách riêng)
    adminApprovedResources = await prisma.resource.count({ where: { status: 'APPROVED', user: { role: 'ADMIN' } } });
    // Tổng số upload và download của user hiện tại
    totalUploads = await prisma.resource.count({ where: { createdBy: userId } });
    totalDownloads = await prisma.downloadLog.count({ where: { userId } });
    res.json({
      totalApprovedResources,
      userApprovedResources,
      adminApprovedResources,
      totalUploads,
      totalDownloads
    });
  } else {
    // User thường
    userApprovedResources = await prisma.resource.count({ where: { createdBy: userId, status: 'APPROVED' } });
    totalUploads = await prisma.resource.count({ where: { createdBy: userId } });
    totalDownloads = await prisma.downloadLog.count({ where: { userId } });
    res.json({
      userApprovedResources,
      totalUploads,
      totalDownloads
    });
  }
};

// Thống kê phân loại tài nguyên
export const getResourceCategoryStats = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const stats = await prisma.resource.groupBy({
    by: ['subject'],
    where: { createdBy: userId },
    _count: { id: true },
  });
  res.json(stats.map(s => ({ subject: s.subject, count: s._count.id })));
};

// Biểu đồ lượt tải xuống theo thời gian
export const getResourceDownloadChart = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { from, to, interval = 'day' } = req.query;
  const fromDate = from ? new Date(from as string) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const toDate = to ? new Date(to as string) : new Date();

  // Group by day/week/month
  let groupBy: 'day' | 'week' | 'month' = 'day';
  if (interval === 'week') groupBy = 'week';
  if (interval === 'month') groupBy = 'month';

  // Lấy logs download của user trong khoảng thời gian
  const logs = await prisma.downloadLog.findMany({
    where: {
      userId,
      createdAt: { gte: fromDate, lte: toDate },
    },
    select: { createdAt: true },
  });

  // Group logs theo ngày/tuần/tháng
  const chartData: Record<string, number> = {};
  logs.forEach(log => {
    let key = '';
    const d = log.createdAt;
    if (groupBy === 'day') key = d.toISOString().slice(0, 10);
    else if (groupBy === 'week') {
      const firstDayOfWeek = new Date(d);
      firstDayOfWeek.setDate(d.getDate() - d.getDay());
      key = firstDayOfWeek.toISOString().slice(0, 10);
    } else if (groupBy === 'month') key = `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
    chartData[key] = (chartData[key] || 0) + 1;
  });

  res.json(chartData);
};

// Top tài nguyên được tải nhiều nhất
export const getTopDownloadedResources = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const { limit = 5 } = req.query;
  // Đếm số lượt download theo resource
  const stats = await prisma.downloadLog.groupBy({
    by: ['resourceId'],
    where: { userId },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: Number(limit),
  });
  // Lấy thông tin resource
  const resources = await prisma.resource.findMany({
    where: { id: { in: stats.map(s => s.resourceId) } },
  });
  // Map resource info vào stats
  const result = stats.map(s => ({
    ...resources.find(r => r.id === s.resourceId),
    downloadCount: s._count.id,
  }));
  res.json(result);
};

// Lấy tất cả tài nguyên (admin)
export const adminGetAllResources = async (req: Request, res: Response): Promise<void> => {
  try {
    const resources = await prisma.resource.findMany({
      include: {
        user: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(resources);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tài nguyên:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Xoá tài nguyên của chính user (không phải admin)
export const deleteResource = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;
  const { id } = req.params;
  try {
    // Kiểm tra tài nguyên có thuộc về user không
    const resource = await prisma.resource.findUnique({ where: { id: Number(id) } });
    if (!resource || resource.createdBy !== userId) {
      res.status(403).json({ error: 'Bạn không có quyền xóa tài nguyên này.' });
      return;
    }
    await prisma.resource.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xoá tài nguyên:', error);
    res.status(500).json({ error: 'Lỗi khi xóa tài nguyên' });
  }
};

// Xoá tài nguyên (admin)
export const adminDeleteResource = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.resource.delete({ where: { id: Number(id) } });
    res.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xoá tài nguyên:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Duyệt tài nguyên (admin)
export const adminApproveResource = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const updateData: any = { status: 'APPROVED' };
    if (req.body?.subject) updateData.subject = req.body.subject;
    const resource = await prisma.resource.update({
      where: { id: Number(id) },
      data: updateData,
    });
    res.json(resource);
  } catch (error) {
    console.error('Lỗi khi duyệt tài nguyên:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
