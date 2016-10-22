import org.deeplearning4j.models.embeddings.loader.WordVectorSerializer;
import org.deeplearning4j.models.embeddings.wordvectors.WordVectors;
import org.deeplearning4j.models.glove.Glove;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Collection;

/**
 * Created by d056954 on 22/10/2016.
 */
public class Test {
    public static void main(String[] main) {
        WordVectors wordVectors = null;
        ClassLoader classLoader = Test.class.getClassLoader();
        try {
            File f = new File(classLoader.getResource("glove.6B.300d.txt").getFile());
            System.out.println(f);
            wordVectors = WordVectorSerializer.loadTxtVectors(f);
            Collection<String> words = wordVectors.wordsNearest("ocean", 10);

            for(String w : words) {
                System.out.println(w);
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }
}
