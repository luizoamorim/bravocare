import { IShiftsWithFacilityId, IShiftsWithFacilityName } from "../../data";
import ShiftsRepository from "../shiftsRepository";
import { prisma } from "../../lib/prisma";

export class PostgresShiftsRepository implements ShiftsRepository {
    async getShiftsWithFacilityNames(
        request: void,
    ): Promise<IShiftsWithFacilityName[]> {
        const shiftsWithFacilityName =
            await prisma.question_one_shifts.findMany({
                include: {
                    facilities: {
                        select: { facility_name: true },
                    },
                },
            });

        return shiftsWithFacilityName as IShiftsWithFacilityName[];
    }

    async getShiftById(shiftId: number): Promise<IShiftsWithFacilityId | null> {
        const shift = await prisma.question_one_shifts.findUnique({
            where: {
                shift_id: shiftId,
            },
            include: {
                facilities: {
                    select: {
                        facility_id: true,
                    },
                },
            },
        });

        return shift as IShiftsWithFacilityId | null;
    }
}
