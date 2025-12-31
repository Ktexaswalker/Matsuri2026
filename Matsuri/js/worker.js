self.onmessage = async (e) => {
  const { url, nombre } = e.data;
  // Ignorar URLs externas
  if (/^https?:\/\//i.test(url)) {
    self.postMessage({ nombre, dataUrl: null });
    return;
  }
  try {
        const img = await loadImage(url);
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 0.002 });
        const reader = new FileReader();
        reader.onload = () => {
        self.postMessage({ nombre, dataUrl: reader.result });
        };
        reader.readAsDataURL(blob);

    } catch (err) {
        console.error('Error procesando imagen', url, err);
        self.postMessage({ nombre, dataUrl: null });
    }
};
async function loadImage(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return await createImageBitmap(blob);
}