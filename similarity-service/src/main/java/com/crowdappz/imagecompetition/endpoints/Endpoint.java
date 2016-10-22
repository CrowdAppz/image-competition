package com.crowdappz.imagecompetition.endpoints;

import com.crowdappz.imagecompetition.WordVectorHandler;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.List;

/**
 * Created by d056954 on 22/10/2016.
 */

@Path("/")
public class Endpoint {

    @GET
    @Path("/words/similar/{word}/{limit}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSimilarWords(@PathParam("word") final String word, @PathParam("limit") final int limit){
        return Response.ok(new GenericEntity<List<String>>(WordVectorHandler.getNearestWords(word, limit)){}).build();
    }
}
