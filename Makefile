BOARDS = M8512.net
BOARDJS = $(BOARDS:%.net=%.js)

backplane.out:	backplane.js $(BOARDJS)
	node backplane.js > $@

%.js:	%.net
	node netlist-to-module.js $^ $@

clean:
	echo BOARDJS= $(BOARDJS)
	rm -f backplane.out $(BOARDJS)
