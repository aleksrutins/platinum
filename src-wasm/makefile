.PHONY: all
.SUFFIXES: .zig .wasm
ZFLAGS_WASM = -target wasm32-freestanding -dynamic -O ReleaseSmall

.zig.wasm:
	zig build-lib $< $(ZFLAGS_WASM)

all: point-light.wasm