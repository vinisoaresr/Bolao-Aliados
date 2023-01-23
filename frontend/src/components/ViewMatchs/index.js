import React, { useState } from "react";
import { Container, Row, Button, Column } from "./styles";
import CardMatch from "./CardMatch";

const ViewMatchs = ({ Groups }) => {
  const [selectedGroup, setSelectedGroup] = useState(Groups[0]);

  return (
    <Container>
      <Row>
        {Groups.map((group) => (
          <Button key={group.id} onClick={() => setSelectedGroup(group)}>
            {group.name}
          </Button>
        ))}
      </Row>
      <Column>
        {selectedGroup.matchs.map((match) => (
          <CardMatch key={match.id} match={match} />
        ))}
      </Column>
    </Container>
  );
};

export default ViewMatchs;
