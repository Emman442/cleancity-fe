export async function uploadImage(dataUrl: string): Promise<string> {
  // dataUrl = "data:image/jpeg;base64,...."
  const base64 = dataUrl.split(",")[1];

  const formData = new FormData();
  formData.append("image", base64);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await res.json();
  if (!json.success) {
    throw new Error("Image upload failed");
  }

  return json.data.url; // https://i.ibb.co/...
}