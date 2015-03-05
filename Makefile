# Get Makefile directory name: http://stackoverflow.com/a/5982798/376773.
# This is a defensive programming approach to ensure that this Makefile
# works even when invoked with the `-C`/`--directory` option.
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# BIN directory
BIN := $(THIS_DIR)/node_modules/.bin
BABEL ?= $(NODE) $(BIN)/babel

JS_FILES := $(wildcard *.js)
COMPILED_FILES := $(JS_FILES:%.js=build/%.js)

compile: $(COMPILED_FILES)

install: node_modules

clean:
	rm -rf build

distclean:
	rm -rf node_modules

.PHONY: compile, install, clean, distclean

build:
	@mkdir -p build

node_modules:
	npm install

build/%.js: %.js node_modules build
	@printf '\e[1;93m %-10s\e[m %s > %s\n' "babel" "$<" "$@"
	@$(BABEL) --source-maps-inline --optional runtime --experimental $< --out-file $@
