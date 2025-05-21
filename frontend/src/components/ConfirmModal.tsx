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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="bg-white rounded-2xl shadow-lg p-8 min-w-[320px] max-w-full w-fit flex flex-col gap-4">
              <Dialog.Title className="text-xl font-bold text-green-700">{t(title)}</Dialog.Title>
              {description && <p className="text-gray-500 mb-4">{t(description)}</p>}
              <div className="flex gap-2 justify-end">
                <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition">{t('cancel')}</button>
                <button onClick={() => { onConfirm(); onClose(); }} className="px-4 py-2 rounded btn-primary hover:scale-105 transition-transform">{t('confirm')}</button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
