brew install wget
wget http://nlp.stanford.edu/data/glove.6B.zip
unzip glove.6B.zip -d ./src/main/resources
java -jar "./target/image-competition.jar"
