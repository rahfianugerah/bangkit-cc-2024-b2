const tf = require('@tensorflow/tfjs-node');

// Function to load the model
async function loadModel() {
  const modelUrl = "file://models/model.json"; // Use the file:// protocol for local paths
  try {
    const model = await tf.loadLayersModel(modelUrl);
    console.log("Model loaded successfully");
    return model;
  } catch (error) {
    console.error("Error loading model:", error);
  }
}

// Function to make predictions
async function predict(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer)
      .resizeNearestNeighbor([150, 150])
      .expandDims()
      .toFloat();

    const predictions = await model.predict(tensor).data();
    return predictions;
  } catch (error) {
    console.error("Error making prediction:", error);
  }
}

module.exports = { loadModel, predict };
