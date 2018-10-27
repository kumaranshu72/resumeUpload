<h1>Send Your Resume</h1>
<p>Send Your Resume is a REST API that will send your resume to the recruiter.</p>

<h3>Project Setup</h3>
<p>Follow the steps to set up the project</p>
<b>Prerequisite : Install Node and Npm</b>
<ul>
<li>clone the repo using <code>git@github.com:kumaranshu72/resumeUpload.git resumeUpload</code>
<li><code>cd resumeUpload</code>
<li>Install all dependencies in package.json using <code>npm install</code></li>
<li> Edit the Config/keys file with your gmail credentials.
<li>Run the node.js server using <code>npm start</code>
<li>Thats It. Now visit <code>http://localhost:3000</code>
</ul>
<p> Use the following curl request to senf email.</p>
<code>curl -i -X POST -H "Content-Type: multipart/form-data"
-F "from=YourName " -F "subject=Subject Of the email"
-F "body=Here comes the body"
-F "data=@path/to/resume" http://localhost:3000/send-email
</code>
