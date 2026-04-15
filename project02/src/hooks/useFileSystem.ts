import { useContext } from "react";
// Importamos el contexto que creamos en el paso anterior
import { FileSystemContext } from "../context/FileSystemContext";

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);

  // Validación de seguridad para asegurar que el hook se use dentro del proveedor
  if (!context) {
    throw new Error("useFileSystem debe ser usado dentro de un FileSystemProvider");
  }

  return context;
};