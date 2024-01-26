import { Wrapper } from './wrapper';
import { Toggle } from './toggle';
import { Recommended } from './recommended';

import { getRecommended } from '@/lib/recommended-service';

async function Sidebar() {
  const recommended = await getRecommended();
  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={recommended} />
      </div>
    </Wrapper>
  );
}

export default Sidebar;
