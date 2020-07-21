var button = $(".button");


button.on("click", function(event) {
    event.preventDefault();
    queryGithub();
    queryMuse();
});

// GitHub Jobs API
function queryGithub() {
  var searchTermG = $("#search-term").val().trim();
  var locationG = $("#location").val().trim(); 
 
  $.ajax({
    method: "get",
    url: "https://github-jobs-proxy.appspot.com/positions?description=" + searchTermG + "&location=" + locationG,
  }).then((gitHubJobs) => {
    console.log(gitHubJobs);
    gitHubSearch();
      
      function gitHubSearch() { 
        $("#GitHub-results").empty();
        for (i = 0; i < gitHubJobs.length; i++)  {
    
        var jobNameG = $("<p>");
        jobNameG.append(gitHubJobs[i].title);
        jobNameG.addClass("job-name");
    
        var jobCompanyG = $("<p>");
        jobCompanyG.append(gitHubJobs[i].company);
        jobCompanyG.addClass("company-name");
    
        var jobLocationG = $("<p>");
        jobLocationG.append(gitHubJobs[i].location);
        jobLocationG.addClass("job-location");
    
        var jobLinkG = $("<a target='new' href=" + gitHubJobs[i].url + "> Apply </a>");
        jobLinkG.addClass("job-link");
    
        $("#GitHub-results").append(jobNameG);
        $("#GitHub-results").append(jobCompanyG);
        $("#GitHub-results").append(jobLocationG);
        $("#GitHub-results").append(jobLinkG);
    
        } 
    }
      
  });
 }



// The Muse API
function queryMuse() {
    var currentPage = "page=1";
    var location = $("#location").val().trim();     
    var category = "Engineering";    
    var APIKey = "03bcff2180c6d2724009dc9ca02a8daf2b3bed636f4ca3ae537b04eccc8cfb75";
    var queryURL = "https://www.themuse.com/api/public/jobs?" + currentPage + "&api-key=" + APIKey + "&category=" + category + "&location=" + location;
    
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response);
      renderSearch();
    
    
      function renderSearch() { 
        $("#results").empty();
        for (i = 0; i < response.results.length; i++)  {
    
        var jobName = $("<p>");
        jobName.append(response.results[i].name);
        jobName.addClass("job-name");
    
        var jobCompany = $("<p>");
        jobCompany.append(response.results[i].company.name);
        jobCompany.addClass("company-name");
    
        var jobLocation = $("<p>");
        jobLocation.append(response.results[i].locations[0].name);
        jobLocation.addClass("job-location");
    
        var jobLink = $("<a target='new' href=" + response.results[i].refs.landing_page + "> Apply </a>");
        jobLink.addClass("job-link");
    
        $("#results").append(jobName);
        $("#results").append(jobCompany);
        $("#results").append(jobLocation);
        $("#results").append(jobLink);
    
        } 
    }
    
    });
    }