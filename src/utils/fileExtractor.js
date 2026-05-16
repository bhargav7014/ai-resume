import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';
import mammoth from 'mammoth';

// Initialize PDF.js worker
GlobalWorkerOptions.workerSrc = pdfjsWorker;

export const extractTextFromFile = async (file) => {
  const fileType = file.type;

  if (fileType === 'application/pdf') {
    return await extractTextFromPDF(file);
  } else if (
    fileType ===
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return await extractTextFromDOCX(file);
  } else if (fileType === 'text/plain') {
    return await extractTextFromTXT(file);
  } else {
    throw new Error(
      'Unsupported file type. Please upload a PDF, DOCX, or TXT file.'
    );
  }
};

const extractTextFromPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await getDocument({
    data: arrayBuffer,
  }).promise;

  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content = await page.getTextContent();

    const strings = content.items.map((item) => item.str);

    text += strings.join(' ') + '\n';
  }

  return text;
};

const extractTextFromDOCX = async (file) => {
  const arrayBuffer = await file.arrayBuffer();

  const result = await mammoth.extractRawText({
    arrayBuffer,
  });

  return result.value;
};

const extractTextFromTXT = async (file) => {
  return await file.text();
};