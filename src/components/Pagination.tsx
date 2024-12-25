import { Button, HStack } from "@chakra-ui/react";
import { PAGE_SIZE } from "../constants/api";

interface Props {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let lastProcessedPage: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((currentPage) => {
      if (lastProcessedPage) {
        // Check if there's exactly one number missing between current and last
        if (currentPage - lastProcessedPage === 2) {
          rangeWithDots.push(lastProcessedPage + 1);
        } else if (currentPage - lastProcessedPage !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(currentPage);
      lastProcessedPage = currentPage;
    });

    return rangeWithDots;
  };

  return (
    <HStack spacing={2} justify="center">
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      >
        Previous
      </Button>

      {getVisiblePages().map((pageNum, index) => (
        <Button
          key={index}
          size="sm"
          variant={pageNum === currentPage ? "solid" : "outline"}
          colorScheme="blue"
          onClick={() =>
            typeof pageNum === "number" ? onPageChange(pageNum) : undefined
          }
          isDisabled={typeof pageNum !== "number"}
        >
          {pageNum}
        </Button>
      ))}

      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      >
        Next
      </Button>
    </HStack>
  );
};

export default Pagination;
