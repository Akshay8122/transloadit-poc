export const createAssembly = async (file: any, templateId: any) => {
  const expiresDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  const expiresISO = expiresDate.toISOString().replace(/-/g, "/").replace("T", " ").split(".")[0] + "+00:00"; // Ensure UTC timezone

  const params = {
    auth: {
      key: import.meta.env.VITE_TRANSLOADIT_AUTH_KEY, // Your Transloadit Auth Key
      expires: expiresISO,
    },
    template_id: templateId, // ID of your template
  };

  console.log(params, "params");
  const paramsString = JSON.stringify(params);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("params", paramsString);

  const response = await fetch(import.meta.env.VITE_TRANSLOADIT_FETCH_ASSEMBLIES, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create assembly: ${errorText}`);
  }

  return await response.json();
};
