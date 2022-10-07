
.DEFAULT_GOAL := help

.PHONY: help
help: ## display this help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

up: ## bring up local instance of the website
	@bundle exec jekyll s

upw:  ## bring up local instance and watch for changes
	@bundle exec jekyll s --incremental
