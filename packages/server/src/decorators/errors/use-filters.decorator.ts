import type { ErrorFilter } from '../../interfaces';
import { UseFilters as $UseFilters, type Newable } from '@ragemp-mango/core';

export function UseFilters(...filters: (Newable<ErrorFilter> | ErrorFilter)[]) {
    return $UseFilters(...filters);
}
