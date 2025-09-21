// Import the Hapi & routes modules
const Hapi = require("@hapi/hapi");
const routes = require("./routes");

// Define the init function to create the server
const init = async () => {
    // Create a new server
    const server = Hapi.server({
        port: 9000, // Server port
        host: 'localhost', // Server host
        routes: {
            cors: {
                origin: ['*'], // Allow CORS from all origins
            },
        },
    });

    // Add routes to the server
    server.route(routes);

    // Start the server
    await server.start();
    console.log(`Server running at ${server.info.uri}`);
}

// Run the init function to start the server
init();