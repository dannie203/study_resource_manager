import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useI18n } from '../context/i18nContext';

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
}

export default function ConfirmModal({ open, onClose, onConfirm, title, description }: ConfirmModalProps) {
  const { t } = useI18n();
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
              <Dialog.Title className="text-lg font-bold mb-2 text-green-700">{title}</Dialog.Title>
              {description && <p className="mb-4 text-gray-600">{description}</p>}
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200">{t('cancel')}</button>
                <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">{t('confirm')}</button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
