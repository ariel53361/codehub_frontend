import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useRoomQueryStore from "../store/roomQueryStore";

function SortSelector() {
  const roomQuery = useRoomQueryStore((s) => s.roomQuery);
  const onSelectSortOrder = useRoomQueryStore((s) => s.setSortOrder);
  const sortOrders = [
    { value: "-latest_message", label: "Recent Activity" },
    { value: "-created", label: "Created" },
    { value: "-participants_num", label: "Participants" },
  ];
  const currentSortOrder = sortOrders.find(
    (order) => order.value === roomQuery.sortOrder
  );
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Order by: {currentSortOrder?.label || "Recent Activity"}
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            onClick={() => onSelectSortOrder(order.value)}
            key={order.value}
            value={order.value}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default SortSelector;
