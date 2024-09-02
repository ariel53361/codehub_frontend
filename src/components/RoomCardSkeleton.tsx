import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const RoomCardSkeleton = () => {
  return (
    <Card>
      <Skeleton borderRadius={10} height="200px" width="100%" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default RoomCardSkeleton;
