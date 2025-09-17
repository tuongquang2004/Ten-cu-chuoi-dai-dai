import { useState } from "react";

export function useModal() {
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [showImportModal, setShowImportModal] = useState<boolean>(false);

    return { showConfirmModal, setShowConfirmModal, showImportModal, setShowImportModal }
}