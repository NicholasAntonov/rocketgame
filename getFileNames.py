from os import walk
from string import rstrip

def getFiles():
    myFile = open("filenames.txt", "w");
    for (dirpath, dirnames, filenames) in walk('.\images'):
        for name in filenames:
            if name.endswith('.png'):
                finalString = name.replace('.png','') + ', ' + dirpath + '\\' + name + '\n';
                myFile.write(finalString);

    myFile.close();

getFiles();
