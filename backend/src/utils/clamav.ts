import NodeClam from 'clamscan';

let clam: any = null;

export async function getClamInstance() {
  if (!clam) {
    // NodeClam is a constructor, .init() returns the ClamScan API instance
    const clamscan = await new NodeClam().init({
      removeInfected: false,
      quarantineInfected: false,
      scanLog: undefined,
      debugMode: false,
      fileList: undefined, // fix: must be string | undefined
      scanRecursively: false,
      clamdscan: {
        socket: false,
        host: '127.0.0.1',
        port: 3310,
        timeout: 60000,
        localFallback: true,
      },
      preference: 'clamdscan',
    });
    clam = clamscan;
  }
  return clam;
}

export async function scanBuffer(buffer: Buffer) {
  const clam = await getClamInstance();
  try {
    await clam.ping();
    const result = await clam.scanBuffer(buffer);
    return { isInfected: result.isInfected, viruses: result.viruses };
  } catch (err) {
    throw new Error('ClamAV is not available or failed to scan buffer.');
  }
}

export async function scanFile(filePath: string) {
  const clam = await getClamInstance();
  try {
    await clam.ping();
    const result = await clam.scanFile(filePath);
    return { isInfected: result.isInfected, viruses: result.viruses };
  } catch (err) {
    throw new Error('ClamAV is not available or failed to scan file.');
  }
}
