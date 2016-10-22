package com.crowdappz.imagecompetition.endpoints;

import com.crowdappz.imagecompetition.WordVectorHandler;

import javax.ws.rs.*;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

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

    @GET
    @Path("/words/similar/{limit}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSimilarWordsFromWordBag(@QueryParam("words") String words, @PathParam("limit") final int limit){
        String[] splitWords = words.split(",");
        Set<String> allNearestWords = new HashSet<String>();
        for(String word : splitWords){
            List<String> nearestWords = WordVectorHandler.getNearestWords(word, limit);
            allNearestWords.addAll(nearestWords);
        }

        return Response.ok(new GenericEntity<Set<String>>(allNearestWords){}).build();
    }
}
