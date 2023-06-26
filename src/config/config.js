const config = {
    development: {
      backendUrl: import.meta.env.BASE_URL+"/api/v1/dalle",
    },
    production: {
      backendUrl: import.meta.env.BASE_URL+"/api/v1/dalle",
    },
  };
  
  export default config;