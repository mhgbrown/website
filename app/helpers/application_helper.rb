module ApplicationHelper

  def google_analytics_tag
    return unless Rails.env == "production"

    %{<script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-24597738-1', 'morgan.io');
        ga('send', 'pageview');
      </script>}.html_safe
  end

  def navigation(inline=false)
    nav = <<-HTML
        <li><a rel="prerender" target="_blank" href="http://github.com/discom4rt">Code</a></li>
        <li><a target="_blank" href="http://www.linkedin.com/in/morg4n">Resume</a></li>
        <li><a href="http://blog.morgan.io">Blog</a></li>
        <li #{request.fullpath.include?("projects") ? "class=\"active\"" : ""}>#{link_to "Projects", projects_path}</li>
        <li><a target="_blank" href="http://soundcloud.com/discom4rt/favorites">Music</a></li>
        <li><a target="_blank" href="http://instagram.com/discom4rt">Photos</a></li>
      </ul>
    HTML

    if inline
      nav = %{
        <ul class="navigation inline">
          <li><a href="/">Morgan Brown</a></li>
      } + nav
    else
      nav = %{
        <ul class="navigation">
      } + nav
    end

    nav.html_safe
  end

end
