import api, { extractData, extractError } from "@/lib/api";

export async function loginUser(credentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    return { success: true, data: extractData(response) };
  } catch (error) {
    return { success: false, error: extractError(error) };
  }
}

export async function registerUser(userData) {
  try {
    const userResponse = await api.post("/users", userData);
    const user = extractData(userResponse);

    const authResponse = await api.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });

    return {
      success: true,
      data: {
        user,
        auth: extractData(authResponse),
      },
    };
  } catch (error) {
    const msg = extractError(error).toLowerCase();
    if (
      error.response?.status === 409 ||
      msg.includes("exists") ||
      msg.includes("already")
    ) {
      try {
        const authResponse = await api.post("/auth/login", {
          email: userData.email,
          password: userData.password,
        });
        return {
          success: true,
          data: { auth: extractData(authResponse), user: null },
        };
      } catch (loginError) {
        return { success: false, error: extractError(loginError) };
      }
    }
    return { success: false, error: extractError(error) };
  }
}

export async function registerViaAuth(userData) {
  try {
    const response = await api.post("/auth/register", userData);
    const auth = extractData(response);

    const loginResponse = await api.post("/auth/login", {
      email: userData.email,
      password: userData.password,
    });

    return {
      success: true,
      data: {
        auth: extractData(loginResponse) || auth,
      },
    };
  } catch (error) {
    return { success: false, error: extractError(error) };
  }
}
