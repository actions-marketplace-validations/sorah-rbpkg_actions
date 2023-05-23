import { extractRubyVersionText, readInput } from "./input";
import { installRuby } from "./installer";
import * as bundlerCache from "./bundler_cache";

import * as core from "@actions/core";

async function run(): Promise<void> {
  try {
    const input = readInput();
    const rubyVersionText = extractRubyVersionText(input);
    await installRuby(rubyVersionText, input.rubyPackageVersion);

    if (input.bundlerCache) {
      await bundlerCache.bundleInstall();
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
