export class NumericUtils {

    /**
     * ******************
     * ScaleRangeLong()
     * <p/>
     * Scale InputValue's location in the input range to the
     * equivalent value in the specified output range.
     * Use long's.
     * *******************
     */

    /*
    public static int scaleRange(int InputValue,
                                 int InputRangeMin,
                                 int InputRangeMax,
                                 int OutputValueMin,
                                 int OutputValueMax)
    {
        float xRange, yRange, m, b, result, intPart;
        int OutputValue;

        OutputValue = OutputValueMin;

        xRange = (float) (InputRangeMax - InputRangeMin);
        yRange = (float) (OutputValueMax - OutputValueMin);

        if (xRange > 0.0F)
        {
            m = yRange / xRange;
            b = (float) OutputValueMin - (m * (float) InputRangeMin);
            result = (m * (float) InputValue) + b;

            // Implement our own rounding scheme: if the fractional part >= 0.5, round up; otherwise, down
            intPart = modf(result);
            if (intPart >= 0.5f)
            {
                OutputValue = (int) Math.ceil((double) result);
            }
            else
            {
                OutputValue = (int) Math.floor((double) result);
            }
        }

        return OutputValue;
    }
    */

    /**
     * Scale the input value into the output range.
     *
     * @param inputValue
     * @param inputRangeMin
     * @param inputRangeMax
     * @param outputValueMin
     * @param outputValueMax
     * @return rescaled value
     */
    public static scaleRange(inputValue: number,
                             inputRangeMin: number,
                             inputRangeMax: number,
                             outputValueMin: number,
                             outputValueMax: number): number {
        let normalizedValue: number = NumericUtils.normalize(inputValue, inputRangeMin, inputRangeMax);
        return NumericUtils.unnormalize(normalizedValue, outputValueMin, outputValueMax);
    }


    public static normalize(inValue: number, minValue: number, maxValue: number): number {
        // assert (inRangeInclusive(inValue, minValue, maxValue));

        let range: number = maxValue - minValue;
        let output: number;
        if (NumericUtils.isGreaterThan(range, 0.0)) {
            output = (inValue - minValue) / range;
        } else {
            output = minValue;
        }
        // assert (inRangeInclusive(output, 0.0F, 1.0F));

        return output;
    }

    public static inRangeInclusive(inValue: number, inMin: number, inMax: number) {
        let valid = false;

        if ((inValue > inMin) && (inValue < inMax)) {
            valid = true;
        } else {
            if (NumericUtils.isEqual(inValue, inMin)) {
                valid = true;
            } else {
                if (NumericUtils.isEqual(inValue, inMax)) {
                    valid = true;
                }
            }
        }
        return valid;
    }


    public static inRangeExclusive(inValue: number, inMin: number, inMax: number) {
        return ((inValue > inMin) && (inValue < inMax));
    }


    /**
     * ******************
     * ClampInRangeFloat()
     * <p/>
     * Place inValue between the specified input range,
     * clipping to the min and max values as required.
     * *******************
     */
    public static clampInRange(inValue: number,
                               inputRangeMin: number,
                               inputRangeMax: number): number {
        return (inValue >= inputRangeMin) ? ((inValue > inputRangeMax) ? inputRangeMax : inValue) : inputRangeMin;
    }


    /**
     * Returns a value that ranges from min up to (but including) max. As incoming values exceed max, they are wrapped
     * back around within range. This causes monotonically increasing input values to cycle through the range min->max.
     *
     * @param value
     * @param min
     * @param max
     * @return a wrapped number
     */
    /*
        public static  wrapInRange( value: number, min: number, max: number): number {
            let range: number = max - min;
            let remainder: number =  Math.IEEEremainder( (value - min),  range);

            return remainder + min;
        }
    */


    /*
        public static  triangleWave(inValue: number): number
        {
            let outValue: number;

             compare = Float.compare(inValue, 0.5f);
            if (compare < 0)
            {
                outValue = inValue;
            }
            else
            {
                outValue = 1.0f - inValue;
            }

            return outValue;

        }
    */


    public static unnormalize(normalizedValue: number, inMin: number, inMax: number): number {
        return (normalizedValue * (inMax - inMin)) + inMin;
    }


    public static isEqual(inFloat1: number, inFloat2: number) {
        return NumericUtils.compare(inFloat1, inFloat2) === 0;
    }


    public static isGreaterThan(f1: number, f2: number): boolean {
        return (NumericUtils.compare(f1, f2) > 0);
    }


    public static isLessThan(f1: number, f2: number): boolean {
        return (NumericUtils.compare(f1, f2) < 0);
    }

    public static compare(f1: number, f2: number): number {
        /**
         * Compares the two specified <code>float</code> values. The sign
         * of the integer value returned is the same as that of the
         * integer that would be returned by the call:
         * <pre>
         *    new Float(f1).compareTo(new Float(f2))
         * </pre>
         *
         * @param   f1        the first <code>float</code> to compare.
         * @param   f2        the second <code>float</code> to compare.
         * @return the value <code>0</code> if <code>f1</code> is
         *        numerically equal to <code>f2</code>; a value less than
         *          <code>0</code> if <code>f1</code> is numerically less than
         *        <code>f2</code>; and a value greater than <code>0</code>
         *        if <code>f1</code> is numerically greater than
         *        <code>f2</code>.
         * @since 1.4
         */
        if (f1 < f2) {
            return -1;         // Neither val is NaN, thisVal is smaller
        } else {
            if (f1 > f2) {
                return 1;         // Neither val is NaN, thisVal is larger
            } else {
                return 0;
            }
        }
    }

    public static isNormalized(inValue: number): boolean {
        let valid = false;

        if ((inValue > 0.0) && (inValue < 1.0)) {
            valid = true;
        } else {
            if (NumericUtils.isEqual(inValue, 0.0)) {
                valid = true;
            } else {
                if (NumericUtils.isEqual(inValue, 1.0)) {
                    valid = true;
                }
            }
        }
        return valid;
    }
}
