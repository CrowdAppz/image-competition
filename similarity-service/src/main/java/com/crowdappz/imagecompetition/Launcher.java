package com.crowdappz.imagecompetition;

import com.crowdappz.imagecompetition.endpoints.DefaultHeaders;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;


import java.io.IOException;
import java.net.URI;

/**
 * Created by d056954 on 22/10/2016.
 */
public class Launcher {
    // ================ Constants =========================================== //
    public static final String ENDPOINT_PACKAGE = "com.crowdappz.imagecompetition.endpoints";

    // ================ Members ============================================= //
    private static HttpServer server;

    // ================ Constructors & Main ================================= //

    public static void main(String[] args) throws IOException{

        final String address = "http://0.0.0.0:8002";

        WordVectorHandler.init();

        // starting and configuring server
        final ResourceConfig rc = new ResourceConfig().packages(ENDPOINT_PACKAGE);
        rc.register(DefaultHeaders.class);
        server = GrizzlyHttpServerFactory.createHttpServer(URI.create(address), rc);

        System.out.println("Server running. Hit enter to stop it...");

        // waiting for termination
        System.in.read();
        server.shutdownNow();

    }
}
