package com.crowdappz.imagecompetition;

import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.embeddings.wordvectors.WordVectors;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by d056954 on 22/10/2016.
 */
public class WordVectorHandler {

    private static final String modelFileName = "glove.6B.300d.txt";
    private static WordVectors wordVectors = null;

    public static void init() {
        ClassLoader classLoader = Test.class.getClassLoader();
        try {
            File f = new File(classLoader.getResource(modelFileName).getFile());
            System.out.println(f);
            wordVectors = WordVectorSerializer.loadTxtVectors(f);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    public static List<String> getNearestWords(String word, int limit){
        if (wordVectors == null) return new ArrayList<String>();

        Collection<String> words = wordVectors.wordsNearest(word, limit);
        return new ArrayList<String>(words);
    }
}
