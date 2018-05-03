## dir-dict-index (ddi)
### Create a dir dictionary, e.g. file -> F-/FI-/file

#### install

```bash
npm install --global dir-dict-index
ddi
```

### usage

--help,-h : print this message
--version,-v : print the version
--from,-f [paths] : the entries inside given dirs would be moved into the dictionary
--to,-t [path] : where to create the dictionary
--level,-l [level] : how many levels. A-/AB-/ABC-/abcd.txt is considered 4 levels
--copy : Copy the files, but not move
--simulate : print what will be done but do nothing

### example

Take a look at test/src/, running with -l 2 (default) will result in : 

```
 +- C-
    |  c.txt
    |
    |- CA-
    |      camel.txt
    |      carnival.txt
    |      cat.txt
    |
    |- CR-
           crush.txt
```

### todo

-   i18n (chinese pinyin especially)
-   reversing
-   etc

