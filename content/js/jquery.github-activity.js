(function($) {
	$.fn.githubActivityFor = function(username, params) {
		var githubURL = 'https://github.com/'
		var params = params || {}
		
		if('wrap' in params == false) {
			params['wrap'] = function(item) { return item }
		}		
	
		var userLink = function(user) {
			return $('<a>', {
			    text: user.login,
			    href: githubURL + user.login
			})
		}

		var repositoryLink = function(repo) {
			return $('<a>', {
			    text: repo.name,
			    href: githubURL + repo.name
			})
		}
		
		var branchName = function(ref) {
			return ref.split('refs/heads/')[1]
		}
		
		var issueLink = function(issue) {
			return $('<a>', {
			    text: 'issue ' + issue.number,
			    href: issue.html_url
			})
		}
		
		var pullRequestLink = function(pull_request, comment) {
			var url = pull_request.html_url
			
			if(typeof comment !== 'undefined') {
				url += '#issuecomment-' + comment.id
			}
			
			return $('<a>', {
			    text: 'pull request ' + pull_request.number,
			    href: url
			})			
		}

		var renderer = {
			'CreateEvent': function(event) {
				return  'created respository ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'FollowEvent': function(event) {
				return 'started following ' + userLink(event.payload.target).prop('outerHTML')
			},
			'WatchEvent': function(event) {
				return event.payload.action + ' watching ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'PushEvent': function(event) {
				return 'pushed to ' + branchName(event.payload.ref) + ' at ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'IssueCommentEvent': function(event) {
				return 'commented on ' + pullRequestLink(event.payload.issue, event.payload.comment).prop('outerHTML') + ' on ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'PullRequestEvent': function(event) {
				return 'opened ' + pullRequestLink(event.payload.pull_request).prop('outerHTML') + ' on ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'DeleteEvent': function(event) {
				return 'deleted ' + event.payload.ref_type + ' ' + event.payload.ref + ' at ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'CommitCommentEvent': function(event) {
				return 'commented on ' + repositoryLink(event.repo).prop('outerHTML')
			},
			'IssuesEvent': function(event) {
				return 'opened ' + issueLink(event.payload.issue).prop('outerHTML') + ' on ' + repositoryLink(event.repo).prop('outerHTML')
			},		
			'ForkEvent': function(event) {
				return 'forked ' + repositoryLink(event.repo).prop('outerHTML')
			}				
		}
				
		this.each(function() {
			var el = $(this)
		
			$.get('https://api.github.com/users/' + username + '/events?callback=?', function(activity) {				
				$.each(activity.data, function(index, event) {
					if('limit' in params && index == params['limit']) {
						return false
					}
					
					if(event.type in renderer) {
						el.append(params.wrap($('<li>', {
							html: userLink(event.actor).prop('outerHTML') + ' ' + renderer[event.type](event) + ' ' + jQuery.timeago(new Date(event.created_at))
						})))
					}
					else {
						console.log('No renderer for ' + event.type + ' implemented.')
						console.log(event)
					}
				})			
			}, "json")
		})
	}
})(jQuery)