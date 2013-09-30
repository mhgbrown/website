module ApplicationHelper

  def google_analytics_tag
    return unless Rails.env == "production"

    %{<script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-24597738-1']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
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
