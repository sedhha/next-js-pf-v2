const mustHaveEnvironmentVariables = ['SUPABASE_KEY', 'SUPABASE_URL'];

export const environmentCheck = () =>
  mustHaveEnvironmentVariables.forEach((element) => {
    if (process.env[element] === undefined) {
      throw new Error(
        `${element} is a must have environment variable. But it was not found in configuration file.`
      );
    }
  });
