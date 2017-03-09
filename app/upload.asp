<%

Set Upload = Server.CreateObject("Persits.Upload")
Count = Upload.Save(server.mappath("./files"))
%>