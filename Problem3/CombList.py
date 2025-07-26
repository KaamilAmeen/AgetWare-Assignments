def overlap_ratio(a, b):
    left1, right1 = a
    left2, right2 = b

    overlap_left = max(left1, left2)
    overlap_right = min(right1, right2)
    overlap_length = max(0, overlap_right - overlap_left)

    len_a = right1 - left1
    len_b = right2 - left2

    return (overlap_length > 0.5 * len_a) or (overlap_length > 0.5 * len_b)

def combine_elements(list1, list2):
    combined = list1 + list2

    combined.sort(key=lambda x: x["positions"][0])

    result = []
    i = 0
    while i < len(combined):
        current = combined[i]
        j = i + 1
        while j < len(combined):
            if overlap_ratio(current["positions"], combined[j]["positions"]):
                current["values"].extend(combined[j]["values"])
                j += 1
            else:
                break
        result.append(current)
        i = j

    return result
list1 = [
    {"positions": [0, 5], "values": ["a"]},
    {"positions": [10, 15], "values": ["b"]}
]

list2 = [
    {"positions": [3, 6], "values": ["x"]},
    {"positions": [12, 18], "values": ["y"]}
]

combined_result = combine_elements(list1, list2)
print(combined_result)
