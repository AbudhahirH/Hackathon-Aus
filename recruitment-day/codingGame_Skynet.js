/* Gaming Info
  Coding Name: Skynet Revolution - Episode 1
  Complexlevel: Medium
  Game Link: https://www.codingame.com/ide/puzzle/skynet-revolution-episode-1
  Test Case Success: 3/4
*/

/**Note: 'console.error' is used for Debugging purpose and never mind**/

/*
  Get the first input
  (total number of nodes in the level, number of links, number of exit gateways)
 */
var inputs = readline().split(' '),
    N = parseInt(inputs[0]), // the total number of nodes in the level, including the gateways
    L = parseInt(inputs[1]), // the number of links
    E = parseInt(inputs[2]), // the number of exit gateways
    nodes = {},
    gateways = [];
console.error('inputs: ', inputs)

// List the network
for (let index = 0; index < L; index++) {
  inputs = readline().split(' ');
  let N1 = parseInt(inputs[0]), // N1 and N2 defines a link between these nodes
      N2 = parseInt(inputs[1]);
  console.error('N1 N2: ', N1, N2)

  if (typeof nodes[N1] !== 'undefined') {
    nodes[N1].push(N2)
  } else {
    nodes[N1] = [N2];
  }

  if (typeof nodes[N2] !== 'undefined') {
    nodes[N2].push(N1)
  } else {
    nodes[N2] = [N1];
  }

  console.error('nodes list', nodes);
}

// List all the exit gateways
for (let index = 0; index < E; index++) {
  let EI = parseInt(readline()); // the index of a gateway node
  console.error('EI: ', EI)
  gateways.push(EI);
}

/*
  Run through all paths to a gateway
  without running over several times on same nodes
 */
searchGatewayInSkynet = (SI, path = []) => {
  let result = [],
      skyNet = nodes[SI];
  path.push(SI);

  for (let index in skyNet) {
    let node = skyNet[index],
        predictPath = JSON.parse(JSON.stringify(path)); // JSON.stringify then JSON.parse to clone the object
    if (gateways.indexOf(node) === -1 && path.indexOf(node) === -1) {
      let tmpResult = searchGatewayInSkynet(node, predictPath);
      result = result.concat(tmpResult);
    } else if (gateways.indexOf(node) !== -1) {
      predictPath.push(node); //
      console.error("predictPath", predictPath)

      result.push(predictPath);
    }
  }
  return result;
}

//Get the fastest path to a gateway from a list of path
getClosetGatewayPath = (SI) => {
  let result = searchGatewayInSkynet(SI);
  result.sort((nodeA, nodeB) => nodeA.length > nodeB.length ? 1 : -1);
  console.error("result", result)
  return result[0];
}

// game loop
// Display the result in the standard output
while (true) {
  let SI = parseInt(readline()), // The index of the node on which the Skynet agent is positioned this turn
      result = getClosetGatewayPath(SI);
  console.log(result[0] + ' ' + result[1]);
}