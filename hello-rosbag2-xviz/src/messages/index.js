// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import Converter from './converter';
import { GeometryPoseStamped } from './geometry-posestamped-converter';
import { NavPath } from './nav-path-converter';
import { SensorPointCloud2 } from './sensor-pointcloud2-converter';
import { SensorNavSatFix } from './sensor-navsatfix-converter';
import { SensorImage } from './sensor-image-converter';
import { SensorCompressedImage } from './sensor-compressedimage-converter';
import { VisualizationMarker } from './visualization-marker-converter';
import { VisualizationMarkerArray } from './visualization-markerarray-converter';
import { XVIZFakePose } from './xviz-fake-pose-converter';
import { TopicConverter } from './TopicConverter';

export { Converter, GeometryPoseStamped, NavPath, SensorPointCloud2, SensorNavSatFix, SensorImage, SensorCompressedImage, VisualizationMarker, VisualizationMarkerArray, XVIZFakePose, TopicConverter };

/**
 * Default Converters
 */
export const DEFAULT_CONVERTERS = [GeometryPoseStamped, NavPath, SensorPointCloud2, SensorNavSatFix, SensorImage, SensorCompressedImage, VisualizationMarker, VisualizationMarkerArray, XVIZFakePose, TopicConverter];
