fn main() {
    let contents = std::fs::read_to_string("./src/demo_input.txt").expect("Should read file");
    let rows  = contents
        .lines()
        .map(|l| l.split(',').collect::<Vec<&str>>());
        // .map(|l| l.iter().map(|a| a.split(',').collect::<Vec<_>>().iter().map(|b| b.parse::<i32>()).collect::<Vec<i32>>())) ;

    // for value in rows  {
    //     for string in value {
    //       for nr in string {
    //         print!("{}", nr);
    //         }
    //     }
    //     print!("{}\n", "===");
    // }

}
