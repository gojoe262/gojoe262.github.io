---
layout: post
title:  "Lane Detection Systems"
date:   2016-04-03
tags: tech, car, cars, autonomous, driving, lane detection,
image: binarization-bw-vs-color.jpg
author: Joe Schueller
comments: true
disqus_id: 2016-04-03_Lane_Detection_Systems
---
*Article based on a paper I wrote. [Full paper (pdf)]({{site.baseurl}}/docs/SchuellerJo_An_Analysis_Of_On_Road_Lane_Detection_Systems.pdf)*
<br><br>

Detecting lane markings is a simple task for a human being, but for a computer this is a complex task. A human instantly spots patterns while a computer interprets the road as a set of pixels. Lane detection systems can be active or passive. Active systems use sensors, such as lasers and sonar, to gather and map the data of the surrounding area. These types of sensors are accurate and fast, but are prone to interference. Also, equipment for active systems are more expensive than equipment for passive systems. For these reasons, research in passive systems has been a growing topic. Passive systems do not introduce any interference to the surrounding area and only use visual data as input. Most passive systems rely on dash-mounted cameras to retrieve data. Passive systems have the benefit of being reasonably priced and readily available. Also, video frames contain a wealth of information that can be useful in lane detection systems. For this article, we will focus on passive systems.

There are 4 steps a system runs through when detecting lanes: Preprocess, Feature Detection, Fitting, and Tracking.

## 1. Preprocess ##
Preprocessing has two main goals: remove visual noise and prepare the image for the next steps. Noise could include shadows, road discoloration, or other random noise in the image. The image can also be shrunk down to only the essential parts in an effort to decrease computational complexity.  

#### Binarization ####
One way to reduce noise is to use a binarization function to convert the image to a two-toned image. A binarization function will go through each pixel and determine if it should be redrawn as white or black. For example, a grayscale image will contain pixels ranging in intensity from 0 (black) up to 255 (white). The binarization function would have a threshold, say 100. Any pixel at or below 100 would be redrawn as black. Pixels above 100 would be white. Using this technique, the image would be redrawn in two colors (hence "binary"). Important features of the image, such as bright lane markings on the road, will stand out and be picked up easier in the Feature Detection step and the other following steps.

{% include image.html img="img/binarization-color.jpg" caption="Full color" %}

{% include image.html img="img/binarization-bw.jpg" caption="Binary Image - Black and White. Notice how the lane markings stand out." %}

#### Blurring ####
Other ways of reducing image noise it to apply a blur to the image, usually done with a Gaussian Blur. Commonly used in image processing and graphic design, it is very effective in removing random “salt and pepper noise” from the image.

#### Regions of Interest ####
To increase efficiency, the image may be cut in size to only a portion of the original image. This portion is called a Region of Interest (ROI). A ROI is focused on the road and cuts out the upper part of the image which usually contains only sky. By cutting down the image size, subsequent steps have less image to process, and therefore cut down on the computational complexity in the future steps. ROIs may be shaped in a trapezoid to fit around the view of the road or multiple ROIs may be shaped around the probable edges and lane markings of a road.

{% include image.html img="img/region-of-interest.png" caption="Region of Interest" %}

#### Inverse Perspective Mapping ####
To simplify other steps, Inverse Perspective Mapping (IPM) can be used. IPM maps pixels from a three dimensional view of the road to a two dimensional top-down view of the road. This top-down view is very useful in creating and fitting road models to incoming images.





## 2. Feature Detection ##
Feature detection is the process of finding and selecting various features from the images. This could include anything of use for autonomous driving, including lane markings, road edges, vanishing points, signs, and other cars.

#### Edge Detection ####
A major part of feature detection is edge detection. This is how the system finds the boundaries of the road and lane. Edge detection performs well on structured roads, that is, roads with clear lane markings and edges. However, operating algorithms of edge detection on unstructured roads suffer greatly. The difference between road and non-road may not totally be clear on unstructured roads. Another problem many edge detection systems face is picking up false edges. False edges can be anything from bad lighting, shadows, weather, trees, telephone poles, or even mountain slopes. An edge detection algorithm may pick up a false edge and may end up believing that is the boundary of the road. These problems can usually be lessened in the preprocessing stage where visual noise is removed.

#### Feature Extraction ####
In feature extraction, important features, such as road areas, road markings, or road boundaries, are extracted from the image using various filters or statistical methods. Feature extraction can be broken down into three main classes: area-based methods, edge-based methods, and area-edge combined methods. Area-based methods attempt to group pixels into different sets of clusters based on either intensity or color. This can be done with clustering algorithms such as the ISODATA and [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering). Edge-based feature detection has very good performance works very well, but it only works well on established roads. On unstructured roads, clear lines may not always be visible. Area-edge based methods use a combination of both area-based and edge based techniques. The idea is that when one technique falters, the other technique will be able compensate.





## 3. Fitting ##
In most research, lane detection systems are described as finding road and lanes without prior information about the road. In fitting, domain knowledge is used to apply constraints and fit predefined models to road. Applying domain knowledge to the lane detection system improves accuracy.

#### Domain Constraints ####
The symmetry constraint assumes that for each road boundary on one side of the image, there exists another road boundary on the other side of the image that is parallel.

The road width constraint uses outside data to estimate the width of the road. The outside data can come from previous systems that have driven the road or from accurate satellite imaging. By having an estimated road width, road edge detection knows generally where to find the edge of the road.

The vanishing point agreement constraint is when lines detected in a system all converge to one point. Any lines that do not converge to the vanishing point may be filtered out. For example, a shadow from a telephone pole may cause edge detection systems to find a horizontal line in the image. Since this line does not converge to a vanishing point, this line will be filtered out.

#### Predefined models ####
Models represent the expected road and lanes from an incoming image. Most of the incoming images from a lane detection system are similar, so it makes sense to match the current image with a predefined model. For example, a straight line model uses the parallelism of the road to fit the model. A circular arc model uses the vanishing point as the center of the circle. Road edges are drawn from center of the circle to the outside of the circle. Lane and road width data is commonly used to fit the incoming image to a model.





## 4. Tracking ##

Lane detection systems can take one frame of video run the analysis on it. However, the use of tracking can reduce the computational cost in the analysis. Tracking uses previous frames and its corresponding data to predict future frames. The position of road features, such as road signs and lane markings, can be estimated by tracking their movement in previous frames. Instead of searching the entire image over and over for each frame, only certain areas of the image have to be searched to re-find these features.

Systems have used this idea to rethink the way Regions of Interest (ROI) are created. A new system of Lane Bounded Regions of Interest (LBROI) uses previous frames to create an ROI that surrounds the lane and road boundaries. This limits the search space that is to be used in the next frames of video. Lower computational cost and improved accuracy are the driving forces behind tracking.



## References ##

Aly, M. (2008) Real time Detection of Lane Markers in Urban Streets. IEEE Intelligent Vehicles Symposium. 1 - 6. http://www.vision.caltech.edu/malaa/publications/aly08realtime.pdf

Muad, A., Mustaffa, M., Hussain, A., Majlis B. Y., & Samad, S.A. (2004 November). Implementation of Inverse Perspective Mapping Algorithm for the Development of an Automatic Lane Tracking System. 2004 IEEE Region 10 Conference, Volume A. 207 - 210. doi:10.1109/TENCON.2004.1414393

Piech, C., (2012) K Means. Stanford. Retrived from http://stanford.edu/~cpiech/cs221/handouts/kmeans.html

Tesla Motor Teams (2014) Dual Motor Model S and Autopilot. Retrived from http://www.teslamotors.com/blog/dual-motor-model-s-and-autopilot

Yenikaya, S. Yenikaya G, & Düven E. Berndt, T. J. (2013). Keeping the Vehicle on the Road - A Survey on On-Road Detection Systems. ACM Computing Surveys 46, 1, Article 2, 1 - 43. http://dx.doi.org/10.1145/2522968.2522970  

Yu, B. & Jain, A. K. (1997) Lane Boundary Detection Using A Multiresolution Hough Transform. International Conference on Image Processing, Proceedings., Volume 2. 748 - 751. doi:10.1109/ICIP.1997.638604

(2009 March 23) Canny Edge Detection. Pages 1 - 7.0020http://www.cse.iitd.ernet.in/~pkalra/csl783/canny.pdf

(2008 June 6) Lane Departure Warning System. Retrived from  http://usedsemitrailers.com/lane-departure-warning-system/
