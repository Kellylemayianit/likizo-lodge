// key -> file + intrinsic size (prevents layout shift). Swap files in assets/img for originals.
const I = (file, w, h) => ({ src: `assets/img/${file}`, w, h });
export const IMAGES = {
  team: I('team-pool.jpg', 720, 849),
  cottage: I('cottage.jpg', 634, 797),
  bed: I('room-bed.jpg', 545, 210),
  cabin: I('cabin-a-frame.jpg', 545, 408),
  cabin2: I('cabin-glass.jpg', 545, 411),
  poolSign: I('pool-sign.jpg', 620, 337),
  poolGarden: I('pool-garden.jpg', 620, 413),
  poolWide: I('pool-wide.jpg', 620, 362),
  lounge: I('lounge.jpg', 653, 451),
  dining: I('dining-tree.jpg', 653, 436),
  gazebo: I('gazebo.jpg', 653, 435),
  maasai: I('maasai.jpg', 580, 549)
};
