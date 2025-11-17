import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PdfJsViewerComponent } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'app-pdf',
  imports: [],
  templateUrl: './pdf.html',
  styleUrl: './pdf.scss',
})
export class Pdf {
   @ViewChild('contentToConvert') contentEl!: ElementRef<HTMLElement>;
  @ViewChild('pdfViewer') pdfViewer!: PdfJsViewerComponent;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async generatePdf() {
    if (!isPlatformBrowser(this.platformId)) return;

    // 🔥 Lazy import, verhindert SSR-Fehler
    const html2pdf = (await import('html2pdf.js')).default;

    const element = this.contentEl.nativeElement;

    const options = {
      margin: 10,
      filename: 'meineLandscape.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },

      // 📌 Landscape-PDF korrekt einstellen
      jsPDF: {
        orientation: 'landscape' as const,
        unit: 'mm' as const,
        format: 'a4' as const
      }
    };

    // PDF als Blob erzeugen
    const blob: Blob = await html2pdf()
      .from(element)
      .set(options)
      .outputPdf('blob');

    const blobUrl = URL.createObjectURL(blob);

    // PDF im Viewer anzeigen
    this.pdfViewer.pdfSrc = blobUrl;
    this.pdfViewer.refresh();
  }

}
