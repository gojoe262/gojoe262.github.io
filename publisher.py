# read template file 
template_file = open("posts/blog-template.html", "r")
template_file_data = template_file.read()
template_file.close()

# read the content file
content_file = open(sys.args[0], "r")
content_file_data = content_file.read()




# replace data
templateFileData = templateFileData.replace("{{ TITLE }}", "This is my title")
templateFileData = templateFileData.replace("{{ DATE }}", "2016-02-29")
templateFileData = templateFileData.replace("{{ CONTENT }}", "<h2>Hi</h2>")

# write new file
outfile = open("test.html", "w+")
outfile.write(data)
outfile.close()


