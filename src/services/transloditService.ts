export const createAssembly = async (file: any, templateId: any) => {
  const expiresDate = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  const expiresISO = expiresDate.toISOString().replace(/-/g, "/").replace("T", " ").split(".")[0] + "+00:00"; // Ensure UTC timezone

  const params = {
    auth: {
      key: import.meta.env.VITE_TRANSLOADIT_AUTH_KEY, // Your Transloadit Auth Key
      expires: expiresISO,
    },
    template_id: templateId, // Pass your Transloadit template ID
  };

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

  const assemblyResult = await response.json();

  // Return the assembly result for polling
  return assemblyResult;
};

// Poll the assembly URL until processing is complete
export const pollAssembly = async (assemblyUrl: string, interval = 2000) => {
  let isCompleted = false;
  let assemblyResult = null;

  while (!isCompleted) {
    const response = await fetch(assemblyUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    assemblyResult = await response.json();

    if (assemblyResult.ok === "ASSEMBLY_COMPLETED") {
      isCompleted = true; // Assembly has completed
      return assemblyResult;
    } else if (assemblyResult.ok === "ASSEMBLY_EXECUTING") {
      console.log("Assembly still processing... polling again.");
    } else if (assemblyResult.ok === "ASSEMBLY_FAILED") {
      throw new Error("Assembly processing failed.");
    }

    // Wait before polling again
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  return assemblyResult;
};
