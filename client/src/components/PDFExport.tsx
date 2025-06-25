import { useCallback } from "react";

interface PDFExportOptions {
  filename?: string;
  includeBackground?: boolean;
  format?: "A4" | "Letter" | "Legal";
  orientation?: "portrait" | "landscape";
}

export const usePDFExport = () => {
  const exportToPDF = useCallback((options: PDFExportOptions = {}) => {
    const {
      filename = "ACME-quote.pdf",
      includeBackground = true,
      format = "A4",
      orientation = "portrait",
    } = options;

    // Add print-specific classes to body
    document.body.classList.add("pdf-export");

    // Set up print styles
    const style = document.createElement("style");
    style.textContent = `
      @media print {
        @page {
          size: ${format} ${orientation};
          margin: .5in;
        }
        
        body {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .pdf-export * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Trigger print
    window.print();

    // Cleanup
    setTimeout(() => {
      document.body.classList.remove("pdf-export");
      document.head.removeChild(style);
    }, 1000);
  }, []);

  const downloadAsPDF = useCallback(
    async (options: PDFExportOptions = {}) => {
      const {
        filename = "ACME-quote.pdf",
        includeBackground = true,
        format = "A4",
        orientation = "portrait",
      } = options;

      try {
        // This would typically use a library like html2pdf.js or jsPDF
        // For now, we'll use the browser's print functionality
        exportToPDF(options);
      } catch (error) {
        console.error("PDF export failed:", error);
        // Fallback to print
        exportToPDF(options);
      }
    },
    [exportToPDF]
  );

  return {
    exportToPDF,
    downloadAsPDF,
  };
};

// Utility component for adding print-specific classes
export const PrintSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  pageBreak?: "before" | "after" | "inside-avoid";
}> = ({ children, className = "", pageBreak }) => {
  const breakClass = pageBreak ? `page-break-${pageBreak}` : "";

  return <div className={`${className} ${breakClass}`}>{children}</div>;
};

// Component to hide elements in print
export const PrintHidden: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <div className={`${className} no-print`}>{children}</div>;
};

export default usePDFExport;
