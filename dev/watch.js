/**
 * Represents the developer's watch task.
 */

import chokidar from 'chokidar';
import logger from './logger';
import shell from 'shelljs';

const watch = {
  build: 'npm run dev',
  // List app directories watcher should ignore.
  exempt: ['git', 'build', 'docs', 'logs'],
  // List package managers' directories so the watcher can ignore them.
  packagemanagers: ['bower_components', 'jspm_packages', 'node_modules'],
  // Callback for watcher's add event.
  add: (path) => logger.info(`File ${path} has been added to the watch.`),
  // Callback for watcher's error event.
  error: (error) => logger.error('Error watching.', error),
  // Callback for watcher's ready event.
  ready: () => logger.info('Initial scan complete. Watching for changes.'),
  // Executes watch.build, followed by watch.done, on file change.
  change: (path, stats) => {
    // If possible, inform user which file triggered the change event.
    if (stats) {
      logger.info(`File ${path} changed size to ${stats.size}.`);
    }

    // Execute build command, then inform user of the results.
    shell.exec(watch.build, watch.done);
  },
  // Informs the developer user of the build's state.
  done: (code, stdout, stderr) => {
    const regex = /chrome-devtools:\/\/([\w\W]+)localhost:\d{4}\/node/,
          success = 0;

    if (code === success) {
      const inspectURL = stdout.match(regex),
            prompt = inspectURL
              ? ` To debug app, see ${inspectURL}`
              : '';

      logger.info(`Success building.${prompt}`);
    } else {
      logger.error('Error building.', stderr);
    }

    return code;
  },
};

// Configure watcher.
watch.watcher = chokidar.watch('.', {
  ignored: new RegExp(watch.exempt.concat(watch.packagemanagers).join('|')),
  persistent: true
});

// Register callbacks with watch events.
watch.watcher.
on('add', watch.add).
on('error', watch.error).
on('ready', watch.ready).
on('change', watch.change);

export default watch;
