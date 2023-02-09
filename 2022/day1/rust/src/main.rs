struct Elf {
    position: usize,
    value: i32,
}

fn main() {
    println!("Hello, world!");
    let input = std::fs::read_to_string("./input.txt");
    // get the data
    let first_array = input.unwrap().split("/n");
   print!("{}", first_array[0]); 
    let data = vec![vec![1000, 2000, 3000], vec![4000], vec![5000, 6000],vec![7000, 8000, 9000],vec![10000]];
    // create the array of arrays
    // sum each inner array

    let mut best_elf = Elf { position: usize::MAX , value: 0};

    for (index, array) in data.iter().enumerate() {
        let sum:i32 = array.iter().sum(); 
        if sum > best_elf.value {
            best_elf.value = sum;
            best_elf.position = index;
        }
    }
    
    print!("{}", best_elf.value);
    // keep in mind the max value and positioin
}
